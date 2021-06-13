import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { BillType } from 'types/bill';
import { BILL_TYPE } from '../../../constants';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  selectedBillType: boolean
  billType: BillType
  onClick: (billType: BillType) => void
}

const BillTypeButton: React.FC<Props> = ({ billType, selectedBillType, onClick }) => {
  const containerStyle = useMemo(() => {
    return cx(styles.container,  {
      [styles.selectedGreen]: selectedBillType && billType.id === BILL_TYPE.EXPENDITURE.id,
      [styles.selectedRed]: selectedBillType && billType.id === BILL_TYPE.INCOME.id,
    })
  }, [selectedBillType, billType]);

  const handleClicked = useCallback(() => {
    onClick(billType);
  }, [onClick, billType]);

  return (
    <div className={containerStyle} onClick={handleClicked}>
      {billType.name}
    </div>
  );
};

export default BillTypeButton;
