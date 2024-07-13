function updateInvestmentInfo() {
    const investors = document.querySelectorAll('.investor');
    document.getElementById('numInvestors').innerText = investors.length;

    let totalInvestment = 0;
    investors.forEach(investor => {
        const amount = parseFloat(investor.querySelector('input[name="investment"]').value) || 0;
        totalInvestment += amount;
    });

    document.getElementById('totalInvestment').innerText = totalInvestment.toFixed(2);
}

document.getElementById('addInvestor').addEventListener('click', function() {
    const investorsDiv = document.getElementById('investors');
    const newInvestor = document.createElement('div');
    newInvestor.classList.add('investor');
    newInvestor.innerHTML = `
        <input type="text" name="name" placeholder="Investor Name" required>
        <input type="number" name="investment" placeholder="Investment Amount (in ₹)" required>
    `;
    investorsDiv.appendChild(newInvestor);
    updateInvestmentInfo();
});

document.getElementById('investmentForm').addEventListener('input', updateInvestmentInfo);

document.getElementById('investmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const investors = document.querySelectorAll('.investor');
    let totalInvestment = 0;
    const investments = [];

    investors.forEach(investor => {
        const name = investor.querySelector('input[name="name"]').value;
        const amount = parseFloat(investor.querySelector('input[name="investment"]').value);
        totalInvestment += amount;
        investments.push({ name, amount });
    });

    const salesPrice = parseFloat(document.getElementById('salesPrice').value);
    const totalProfit = salesPrice - totalInvestment;

    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
        <p><strong>Total Investment: </strong>₹${totalInvestment.toFixed(2)}</p>
        <p><strong>Total Sales Price: </strong>₹${salesPrice.toFixed(2)}</p>
        <p><strong>Total Profit: </strong>₹${totalProfit.toFixed(2)}</p>
    `;

    const profitDistributionDiv = document.getElementById('profitDistribution');
    profitDistributionDiv.innerHTML = '';

    investments.forEach(investor => {
        const investmentPercentage = (investor.amount / totalInvestment) * 100;
        const individualProfit = (investor.amount / totalInvestment) * totalProfit;
        const profitPercentage = (individualProfit / totalProfit) * 100;
        const investorProfit = document.createElement('div');
        investorProfit.classList.add('investor-details');
        investorProfit.innerHTML = `
            <p><strong>${investor.name}:</strong></p>
            <p>Investment: ₹${investor.amount.toFixed(2)} (${investmentPercentage.toFixed(2)}%)</p>
            <p>Profit: ₹${individualProfit.toFixed(2)} (${profitPercentage.toFixed(2)}%)</p>
        `;
        profitDistributionDiv.appendChild(investorProfit);
    });
    updateInvestmentInfo();
});
