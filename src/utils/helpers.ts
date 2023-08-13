// export function calculateFutureValue(
//     // FV: number,// Future Value
//     P: number,// Initial investment (principal)
//     PMT: number, //Monthly contribution
//     t: number,// Number of years
//     r: number,// Annual interest rate (decimal)
//     n: number = 1,// Number of times interest is compounded per year
// ): number {
//     const FV = P * (1 + r / n) ^ (n * t); //Future Value
//     const VA = PMT * ((1 + r / n) ^ (n * t) - 1) / (r / n); //Future Value of Annuity

//     return FV + VA;
// }

interface FutureValueResult {
    futureValue: string;
    totalInterest: string;
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
        futureValue: totalFutureValue.toFixed(), 
        totalInterest: (totalFutureValue - depositeSum).toFixed(),
    }
}

// Example usage
// const currentPrincipal = 10000;
// const monthlyContribution = 200;
// const yearsToGrow = 5;
// const yearlyInterestRate = 6;

// const futureValue = calculateFutureValue(currentPrincipal, monthlyContribution, yearsToGrow, yearlyInterestRate);
// console.log(`Future Value: $${futureValue}`);





