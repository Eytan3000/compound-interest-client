interface FutureValueResult {
    futureValue: number;
    totalInterest: number;
  }

export function calculateFutureValue(principal:number, monthlyContribution:number, years:number, yearlyInterestRate:number) :FutureValueResult {
    // Convert yearly interest rate to decimal form
    const interestRate = yearlyInterestRate / 100;

    // Calculate the number of compounding periods per year and total number of periods
    const compoundingFrequency = 12; // Compounded monthly
    const totalPeriods = years * compoundingFrequency;

    // Calculate future value of initial investment
    const futureValueInitial = principal * Math.pow(1 + interestRate / compoundingFrequency, totalPeriods);

    // Calculate future value of annuity (monthly contributions)
    const futureValueAnnuity = monthlyContribution * ((Math.pow(1 + interestRate / compoundingFrequency, totalPeriods) - 1) / (interestRate / compoundingFrequency));

    // Calculate total future value
    const totalFutureValue = futureValueInitial + futureValueAnnuity;
   
    const depositeSum = (principal + (monthlyContribution*12*years));
    return {
        futureValue: totalFutureValue, 
        totalInterest: (totalFutureValue - depositeSum),
    }
}

export function formatSums(sum:number):string{
    return  sum.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


