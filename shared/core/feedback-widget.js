// Thumbs up/down + optional text feedback, submitted straight to Supabase.
// Safe to expose SUPABASE_URL/ANON_KEY client-side: RLS allows insert-only,
// no read policy exists, so nobody but the project owner (via the Supabase
// dashboard) can ever see submitted feedback.

const SUPABASE_URL = "https://xhkwjomsqcybybkobygm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Duj9dWor9UGLwnW6GQezyQ_L1HfgNW6";

function renderFeedbackWidget(containerId, verticalName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="feedback-widget">
      <span class="feedback-prompt">Was this useful?</span>
      <button type="button" class="feedback-thumb" data-rating="up" aria-label="Thumbs up">👍</button>
      <button type="button" class="feedback-thumb" data-rating="down" aria-label="Thumbs down">👎</button>
      <textarea class="feedback-text" placeholder="Optional: tell us more" rows="2"></textarea>
      <button type="button" class="feedback-submit">Send feedback</button>
      <span class="feedback-status" aria-live="polite"></span>
    </div>
  `;

  let selectedRating = null;
  const thumbButtons = container.querySelectorAll(".feedback-thumb");
  const statusEl = container.querySelector(".feedback-status");
  const textEl = container.querySelector(".feedback-text");
  const submitBtn = container.querySelector(".feedback-submit");

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRating = btn.dataset.rating;
      thumbButtons.forEach((b) => b.classList.toggle("selected", b === btn));
    });
  });

  submitBtn.addEventListener("click", async () => {
    if (!selectedRating) {
      statusEl.textContent = "Pick 👍 or 👎 first.";
      return;
    }
    submitBtn.disabled = true;
    statusEl.textContent = "Sending…";

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          vertical: verticalName,
          rating: selectedRating,
          comment: textEl.value.trim() || null,
        }),
      });

      if (res.ok) {
        statusEl.textContent = "Thanks for the feedback!";
        textEl.value = "";
        thumbButtons.forEach((b) => b.classList.remove("selected"));
        selectedRating = null;
      } else {
        statusEl.textContent = "Couldn't send feedback — try again later.";
      }
    } catch (err) {
      statusEl.textContent = "Couldn't send feedback — try again later.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
