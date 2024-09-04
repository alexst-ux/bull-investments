/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { BASE_CURRENCIES } from "../services/apiCurrencyExchange";
import { useCurrency } from "../context/CurrencyContext";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();

  function handleClick(value) {
    toggleCurrency(value);
  }

  return (
    <StyledFilter>
      {BASE_CURRENCIES.map((option) => (
        <FilterButton
          key={option}
          onClick={() => handleClick(option)}
          $active={option === currency ? 1 : null}
          disabled={option === currency}
        >
          {option}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default CurrencyToggle;
