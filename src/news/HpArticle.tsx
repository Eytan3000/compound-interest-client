import { Container, Typography } from '@mui/joy';
import React from 'react';

export default function HpArticle() {
  return (
    <Container maxWidth='md' sx={{marginTop:10}} >
      <Typography level="h3">What is compound interest?</Typography>
      <Typography level="body-lg">
        For savers, the definition of compound interest is basic: It’s the
        interest you earn on both your original money and on the interest you
        keep accumulating. Compound interest allows your savings to grow faster
        over time. In an account that pays compound interest, such as a standard
        savings account, the return gets added to the original principal at the
        end of every compounding period, typically daily or monthly. Each time
        interest is calculated and added to the account, it results in a larger
        balance. With the compound interest formula, the account earns more
        interest in the next compounding period. For example, if you put $10,000
        into a savings account with a 4% annual yield, compounded daily, you’d
        earn $408 in interest the first year, $425 the second year, an extra
        $442 the third year and so on. After 10 years of compounding, you would
        have earned a total of $4,918 in interest. But remember, that’s just an
        example. For longer-term savings, there are better places than savings
        accounts to store your money, including Roth or traditional IRAs and
        CDs.
      </Typography>

      <Typography sx={{marginTop:10}} level="h3">Compounding investment returns</Typography>
      <Typography level="body-lg">
        When you invest in the stock market, you don’t earn a set interest rate
        but rather a return based on the change in the value of your investment.
        When the value of your investment goes up, you earn a return. If you
        leave your money and the returns you earn are invested in the market,
        those returns compound over time in the same way that interest is
        compounded. If you invested $10,000 in a mutual fund and the fund earned
        a 6% return for the year, it means you gained $600, and your investment
        would be worth $10,600. If you got an average 6% return the following
        year, it means your investment would be worth $11,236. Over the years,
        that money can really add up: If you kept that money in a retirement
        account over 30 years and earned that average 6% return, for example,
        your $10,000 would grow to more than $57,000. In reality, investment
        returns will vary year to year and even day to day. In the short term,
        riskier investments such as stocks or stock mutual funds may actually
        lose value. But over a long time horizon, history shows that a
        diversified growth portfolio can return an average of 6% annually.
        Investment returns are typically shown at an annual rate of return.
        Compounding can help fulfill your long-term savings and investment
        goals, especially if you have time to let it work its magic over years
        or decades. You can earn far more than what you started with.
      </Typography>
    </Container>
  );
}
