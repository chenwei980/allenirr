document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const cashFlowsContainer = document.getElementById('cash-flows-container');
    const addCfButton = document.getElementById('add-cf');
    const calculateButton = document.getElementById('calculate-irr');
    const resultDiv = document.getElementById('result');

    // Add new cash flow input
    addCfButton.addEventListener('click', function() {
        const count = cashFlowsContainer.children.length;
        const newItem = document.createElement('div');
        newItem.className = 'cash-flow-item';
        newItem.innerHTML = `
            <label for="cf${count}">Cash Flow ${count} (CF<sub>${count}</sub>):</label>
            <input type="number" id="cf${count}" placeholder="e.g., 3000">
        `;
        cashFlowsContainer.appendChild(newItem);
    });

    // Calculate IRR when button is clicked
    calculateButton.addEventListener('click', function() {
        calculateIRR();
    });

    // Calculate IRR function
    function calculateIRR() {
        // Get all cash flow values
        const cashFlows = [];
        let isValid = true;

        for (let i = 0; i < cashFlowsContainer.children.length; i++) {
            const input = document.getElementById(`cf${i}`);
            const value = parseFloat(input.value);

            if (isNaN(value)) {
                isValid = false;
                input.style.borderColor = 'red';
                setTimeout(() => { input.style.borderColor = ''; }, 2000);
            } else {
                cashFlows.push(value);
            }
        }

        if (!isValid) {
            resultDiv.innerHTML = '<span class="error">Please enter valid numbers for all cash flows</span>';
            return;
        }

        // Check if there's at least one positive and one negative cash flow
        const hasNegative = cashFlows.some(cf => cf < 0);
        const hasPositive = cashFlows.some(cf => cf > 0);

        if (!hasNegative || !hasPositive) {
            resultDiv.innerHTML = '<span class="error">IRR requires both positive and negative cash flows</span>';
            return;
        }

        // Calculate IRR using Newton-Raphson method
        const irr = calculateIRRNewtonRaphson(cashFlows);

        if (irr === null) {
            resultDiv.innerHTML = '<span class="error">Could not calculate IRR. Try adjusting cash flows.</span>';
        } else {
            resultDiv.innerHTML = `<span class="success">IRR: ${(irr * 100).toFixed(2)}%</span>`;
        }
    }

    // Newton-Raphson method to calculate IRR
    function calculateIRRNewtonRaphson(cashFlows, guess = 0.1, maxIterations = 1000, tolerance = 1e-8) {
        let irr = guess;

        for (let i = 0; i < maxIterations; i++) {
            const npv = calculateNPV(cashFlows, irr);
            const npvDerivative = calculateNPVDerivative(cashFlows, irr);

            if (Math.abs(npvDerivative) < tolerance) {
                // Avoid division by near-zero
                return null;
            }

            const newIrr = irr - npv / npvDerivative;

            if (Math.abs(newIrr - irr) < tolerance) {
                return newIrr;
            }

            irr = newIrr;

            // If IRR becomes unrealistic, try with a different initial guess
            if (irr > 10 || irr < -1) {
                return calculateIRRNewtonRaphson(cashFlows, guess * 0.5, maxIterations, tolerance);
            }
        }

        // Did not converge within max iterations
        return null;
    }

    // Calculate Net Present Value (NPV)
    function calculateNPV(cashFlows, discountRate) {
        let npv = 0;

        for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + discountRate, i);
        }

        return npv;
    }

    // Calculate derivative of NPV with respect to discount rate
    function calculateNPVDerivative(cashFlows, discountRate) {
        let derivative = 0;

        for (let i = 1; i < cashFlows.length; i++) {
            derivative -= (i * cashFlows[i]) / Math.pow(1 + discountRate, i + 1);
        }

        return derivative;
    }

    // Allow Enter key to calculate IRR
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateIRR();
        }
    });
});