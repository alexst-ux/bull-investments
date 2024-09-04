import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineReceiptPercent,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import Stat from "./Stat";
import {
  formatCurrencyExt,
  getInvested,
  getPercent,
} from "../../utils/helpers";
import useUnrealizedGain from "../../hooks/useUnrealizedGain";
import SpinnerMini from "../../ui/SpinnerMini";

/* eslint-disable react/prop-types */
function Stats({ holdings, avrgHoldings, currency }) {
  const { isLoading, unrealizedGain } = useUnrealizedGain(
    avrgHoldings,
    currency
  );

  if (isLoading) return <SpinnerMini />;

  const invested = getInvested(holdings, currency);

  return (
    <>
      <Stat
        title="Invested"
        color="blue"
        icon={<HiOutlineBanknotes />}
        value={formatCurrencyExt(invested, currency)}
      />
      <Stat
        title="Unrealized Gain"
        color="green"
        icon={<HiOutlineSquare3Stack3D />}
        value={formatCurrencyExt(unrealizedGain, currency)}
      />
      <Stat
        title="Unrealized Percent"
        color="green"
        icon={<HiOutlineReceiptPercent />}
        value={`${getPercent(invested, unrealizedGain)}%`}
      />
      <Stat
        title="Market Value"
        color="indigo"
        icon={<HiOutlineBriefcase />}
        value={formatCurrencyExt(invested + unrealizedGain, currency)}
      />
    </>
  );
}

export default Stats;
