import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { BillTypeName } from 'types/bill';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  selectedBillType: boolean
  billTypeName: BillTypeName
  onClick: (billTypeName: BillTypeName) => void
}

const BillTypeButton: React.FC<Props> = ({ billTypeName, selectedBillType, onClick }) => {
  const containerStyle = useMemo(() => {
    return cx(styles.container,  {
      [styles.selectedGreen]: selectedBillType && billTypeName === BillTypeName.Expenditure,
      [styles.selectedRed]: selectedBillType && billTypeName === BillTypeName.Income,
    })
  }, [selectedBillType, billTypeName]);

  const handleClicked = useCallback(() => {
    onClick(billTypeName);
  }, [onClick, billTypeName]);

  return (
    <div className={containerStyle} onClick={handleClicked}>
      {billTypeName.toString()}
    </div>
  );
};

export default BillTypeButton;
