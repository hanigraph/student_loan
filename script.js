document.getElementById('loanForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const age = document.getElementById('age').value;
    const loanAmount = document.getElementById('loan_amount').value;
    const yearsToRepay = document.getElementById('years_to_repay').value;
    const interestRate = document.getElementById('interest_rate').value;

    const button = document.querySelector('button');
    
    try {
        const response = await fetch('https://fastapi-example-4k64.onrender.com/calculate_loan/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age: parseInt(age),
                loan_amount: parseFloat(loanAmount),
                years_to_repay: parseInt(yearsToRepay),
                interest_rate: parseFloat(interestRate),
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        document.getElementById('monthlyPayment').textContent = `$${data.monthly_payment.toFixed(2)}`;
        
        // Change button text to "New Calculation"
        button.textContent = 'New Calculation';
        button.removeEventListener('click', handleFormReset); // Remove previous event listener if any
        button.addEventListener('click', handleFormReset); // Add new event listener for reset

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while calculating the loan. Please try again.');
    }
});

function handleFormReset() {
    document.getElementById('loanForm').reset(); // Reset form fields
    document.getElementById('monthlyPayment').textContent = '€0.00'; // Reset the result display

    // Change button text back to "Calculate"
    const button = document.querySelector('button');
    button.textContent = 'Calculate';
    button.removeEventListener('click', handleFormReset); // Remove reset event listener
}
