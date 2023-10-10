# GOSOLR TECHNICAL ASSESSMENT

## Getting Started
**Frontend**\
`cd frontend && npm run start`

**Backend**\
`cd backend && npm run start`

## User Story
As a GoSolr customer I want to provide details about my home so that the software can recommend a solar PV solution that would suit my needs and indicate how much I can expect to save on my electricity bill.

## Requirements
**Frontend**
1. TypeScript / React.
2. Mobile friendly.
3. Allow the user to enter their current Electricity spend in ZAR per month.
4. Use Formik to validate user input.
5. Display best suited solution.

**Backend**
1. ExpressJS.
2. API to manage the calculation.
3. Database / Simulated Database to save calculation data.

**Bonus**
1. Unit Tests.
2. CI/CD Pipeline to deploy GitHub pages when code is committed.

## GoSolr Solutions
| Name | Cost | AvgDailyProduction | ProductionIfAdjusts |
| ----------- | ----------- | ----------- | ----------- |
| Small | 1399 | 10 | 12 |
| Medium | 1740 | 14 | 16 |
| Large | 2900 | 18 | 26 |
| Extra Large | 4400 | 28 | 36 |

## Calculations
**Key**\
`UI` User Input\
`TB6` Tariff <= 600\
`TA6` Tariff > 600\
`MC` Monthly Consumption\
`RS` Recommended Solution\
`DO` Expected Daily Output\
`MO` Expected Monthly Output\
`S` Savings\
`TC` Total Cost\
`D` Difference

**Monthly Consumption**
```
MC = UI > (TB6 * 600) ? ((UI - (600 * TB6)) / TA6 ) + 600 : UI / TB6
```

**Recommended Solution**
```
RS =
Switch (UI)
case UI < 1500: Small
case UI < 3000: Medium
case UI < 5000: Large
case UI >= 5000: Extra Large
```

**Expected Daily Output**
```
Average Daily Production
DO =
Switch (RS.name)
case Small: Math.min([RS.AvgDailyProduction, (MC / 30) * 0.85])
case Medium:
case Large:
case Extra Large:
    RS.AvgDailyProduction

Production If Adjusts
DO =
Switch (RS.name)
case Small: Math.min([RS.ProductionIfAdjusts, (MC / 30) * 0.85])
case Medium:
case Large:
case Extra Large:
    RS.ProductionIfAdjusts
```

**Expected Monthly Output**
```
Average Daily Production & Production If Adjusts
MO = DO * 30
```

**Savings**
```
S = 
MC < 600 ? MO * TB6
(MC - MO) >= 600 ? MO * TA6 : (MC - 600) * TA6 + (600 - (MC - MO)) * TB6
```

**Total Cost**
```
TC = (UI - S) + RS.cost
```

**Difference**
```
D = TC - UI
```

## Theme
**Colours**\
AccentLight #ffdc00\
AccentDark #ffbe00\
Primary #ffd200\
Secondary #00000\
Tertiary #f0f0f0

**Fonts**\
Poppins ExtraLight, Regular, SemiBold