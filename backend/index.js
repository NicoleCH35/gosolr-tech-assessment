const express = require('express');
const app = express();
const port = 5000;

const TARIFF_BELOW_600 = 3.508;
const TARIFF_ABOVE_600 = 4.2656;

const SOLUTIONS = {
  small: {
    name: "Small",
    cost: 1399,
    average_daily_production: 10,
    production_if_adjusts: 12,
  },
  medium: {
    name: "Medium",
    cost: 1740,
    average_daily_production: 14,
    production_if_adjusts: 16,
  },
  large: {
    name: "Large",
    cost: 2900,
    average_daily_production: 18,
    production_if_adjusts: 26,
  },
  extra_large: {
    name: "Extra Large",
    cost: 4400,
    average_daily_production: 28,
    production_if_adjusts: 36,
  },

};

const getRecommededSolution = (currentSpend) => {
  switch(true){
    case currentSpend < 1500:
      return SOLUTIONS.small;
    case currentSpend < 3000:
      return SOLUTIONS.medium;
    case currentSpend < 5000:
      return SOLUTIONS.large;
    case currentSpend >= 5000:
      return SOLUTIONS.extra_large;
    default:
      return {};
  }
};

const getMonthlyConsumption = (currentSpend) => (
  Math.round(currentSpend > (TARIFF_BELOW_600 * 600) ? (((currentSpend - (600 * TARIFF_BELOW_600)) / TARIFF_ABOVE_600) + 600) : (currentSpend / TARIFF_BELOW_600))
);

const getExpectedOutput = (name, production) => {
  switch(name){
    case 'Small':
      const daily = Math.min([production, (consumption / 30) * 0.85]);
      return {
        daily,
        monthly: daily * 30,
      };
    case 'Medium':
    case 'Large':
    case 'Extra Large':
      return {
        daily: production,
        monthly: production * 30,
      };
  }

};

const getSavings = (consumption, output) => {
  if (consumption < 600){
    return output * TARIFF_BELOW_600;
  }

  if ((consumption - output) > 599){
    return output * TARIFF_ABOVE_600;
  } else {
    return (consumption - 600) * TARIFF_ABOVE_600 + (600 - (consumption - output)) * TARIFF_BELOW_600;
  }
};

const getTotalCost = (spend, cost, savings) => {
  return (spend - savings) + cost;
};

app.get('/getRecommededSolution/:spend', (req, res) => {
  const currentSpend = req.params.spend;
  let recommededSolution = getRecommededSolution(currentSpend);

  // Empty Recommended Solution
  if (Object.keys(recommededSolution).length === 0){
    res.status(500).send({
      error: true,
      message: 'Unable to get recommended solution.'
    });
  }

  const monthlyConsumption = getMonthlyConsumption(currentSpend);

  const expectedAverageProduction = getExpectedOutput(recommededSolution.name, recommededSolution.average_daily_production);
  const expectedAdjusmentProduction = getExpectedOutput(recommededSolution.name, recommededSolution.production_if_adjusts);

  const averageSavings = getSavings(monthlyConsumption, expectedAverageProduction.monthly);
  const adjustmentSavings = getSavings(monthlyConsumption, expectedAdjusmentProduction.monthly);

  const averageTotalCost = getTotalCost(currentSpend, recommededSolution.cost, averageSavings);
  const adjustmentsTotalCost = getTotalCost(currentSpend, recommededSolution.cost, adjustmentSavings);

  res.status(200).send({
    spend: currentSpend,
    solution: recommededSolution?.name || 'Unknown',
    cost: recommededSolution?.cost || 'NA',
    savings_gosolr: {
      average: averageSavings,
      adjustments: adjustmentSavings,
    },
    total_cost: {
      average: averageTotalCost,
      adjustments: adjustmentsTotalCost,
    },
    difference: {
      average: averageTotalCost - currentSpend,
      adjustments: adjustmentsTotalCost - currentSpend,
    },
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});