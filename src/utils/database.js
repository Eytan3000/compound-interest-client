export async function postDataToDb(
  principal,
  monthlyContribution,
  yearsToGrow,
  yearlyInterestRate,
  fv, totalDeposit, totalInterest
) {
  const postData = {
    principal,
    monthlyContribution,
    yearsToGrow,
    yearlyInterestRate,
    fv, totalDeposit, totalInterest
  };
  try {
    const response = await fetch('http://localhost:8090/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function get10RecentFv() {
  try {
    const response = await fetch('http://localhost:8090/10LastFv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function getLog(id) {
  try {
    const response = await fetch('http://localhost:8090/logs/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}
