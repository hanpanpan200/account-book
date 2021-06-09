import { Category } from 'types/bill';
import carLoanIcon from 'assets/icons/car-loan.svg';
import houseLoanIcon from 'assets/icons/house-loan.svg';
import carMaintenanceIcon from 'assets/icons/car-maintenance.svg';
import houseRentIcon from 'assets/icons/house-rent.svg';
import shoppingIcon from 'assets/icons/cart.svg';
import transportIcon from 'assets/icons/transport.svg';
import travelIcon from 'assets/icons/travel.svg';
import foodIcon from 'assets/icons/food.svg';
import salaryIcon from 'assets/icons/salary.svg';
import stockIcon from 'assets/icons/stock.svg';
import fundIcon from 'assets/icons/fund.svg';

const CATEGORIES: Category[] = [
  {
    id: '1bcddudhmh',
    type: 0,
    name: '车贷',
    icon: carLoanIcon,
  },
  {
    id: 'hc5g66kviq',
    type: 0,
    name: '车辆保养',
    icon: carMaintenanceIcon,
  },
  {
    id: '8s0p77c323',
    type: 0,
    name: '房贷',
    icon: houseLoanIcon,
  },
  {
    id: '0fnhbcle6hg',
    type: 0,
    name: '房屋租赁',
    icon: houseRentIcon,
  },
  {
    id: 'odrjk823mj8',
    type: 0,
    name: '家庭用品',
    icon: shoppingIcon,
  },
  {
    id: 'bsn20th0k2o',
    type: 0,
    name: '交通',
    icon: transportIcon,
  },
  {
    id: 'j1h1nohhmmo',
    type: 0,
    name: '旅游',
    icon: travelIcon,
  },
  {
    id: '3tqndrjqgrg',
    type: 0,
    name: '日常饮食',
    icon: foodIcon,
  },
  {
    id: 's73ijpispio',
    type: 1,
    name: '工资',
    icon: salaryIcon,
  },
  {
    id: '1vjj47vpd28',
    type: 1,
    name: '股票投资',
    icon: stockIcon,
  },
  {
    id: '5il79e11628',
    type: 1,
    name: '基金投资',
    icon: fundIcon,
  }
]

export default CATEGORIES;
