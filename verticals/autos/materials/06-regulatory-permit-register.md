# Regulatory Permit Register

Maintained by Regulatory Affairs. Two metros, two different permit types under California's DMV
autonomous vehicle regulations (13 CCR §227 et seq.), each with different conditions.

## Millbrook — CA DMV Testing Permit

Testing permits require **a safety driver in the driver's seat at all times**, ready to take
control. No driverless authorization. This permit does not by itself authorize carrying paying
passengers.

## Dunmore — CA DMV Deployment Permit + city Transportation Charter Permit

Deployment permits authorize **driverless operation** (no safety driver required) within the
permitted boundary. The city Transportation Charter Permit is layered on top for passenger
service and defines the boundary as **City of Dunmore limits** — see
`03-odd-geofence-register.md` for where that boundary does and does not line up with the
marketing service-area map and Mapping's validated ODD.

## Fleet Ops driver roster — the "safety driver required" toggle

Fleet Ops schedules safety drivers through a single fleet-wide roster system. The
`safety_driver_required` field defaults to **YES** for every vehicle regardless of metro or permit
type — it was set conservatively at Millbrook launch and never flipped to NO for Dunmore vehicles
after the Deployment Permit was granted. In practice, dispatch mostly stopped scheduling drivers
for Dunmore trips, but the roster field itself still reads YES fleet-wide, so **the roster cannot
be used to determine whether a given Dunmore trip actually ran driverless** — only the vehicle's
own seat-occupancy telemetry can. See `01-fleet-vehicle-registry.md` (FLT-0244) for a case where
the same ambiguity affects a Millbrook vehicle in the other direction — roster says "required and
scheduled," telemetry says the seat was empty on 12 of the last 20 trips.

## NHTSA Standing General Order 2021-01

Requires ADS operators to report certain crash and disengagement events. Overland's incident
review process (`02-disengagement-incident-log.md`) produces three independent determinations per
reportable event — telemetry, safety driver, and engineering review — but SGO reporting requires
exactly one determination per event, which is why INC-0442 shows only the engineering review
determination as the one actually filed.
