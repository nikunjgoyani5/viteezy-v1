# Prerequisites

+ aws cli
+ aws credentials
+ kubectl

# Production instructions

```
make deploy
```
This will migrate the database to latest versions and refresh all the pods when there are new versions.
No other actions are expected to be needed in production so far.