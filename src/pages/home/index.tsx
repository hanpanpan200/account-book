import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from 'pages/home/Header'
import client from 'adapters/localStorageClient';
import { BillGroup, Category, CategoryGroup, GroupCondition } from 'types/bill';
import { getBillGroupBy, getCategoryGroup, } from 'utils/billUtil';
import { getNow } from 'utils/dateUtil';
import styles from './index.module.scss';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';

const Home: React.FC = () => {
  const [month, setMonth] = useState<number>(getNow().getMonth() + 1);
  const [year, setYear] = useState<number>(getNow().getFullYear());
  const [category, setCategory] = useState<Category | undefined>();

  const [billGroup, setBillGroup] = useState<BillGroup>({});
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState<boolean>(false);

  useEffect(() => {
    client.fetchBills().then((rawBills) => {
      if (rawBills) {
        const filter = {
          category: category?.id,
          year,
          month,
        };
        const billGroup = getBillGroupBy(rawBills, filter, GroupCondition.Date);
        setBillGroup(billGroup);
      }
    }).catch(() => {
      console.log('failed to load bills')
    });
  }, [category?.id, year, month]);

  useEffect(() => {
    client.fetchCategories().then((categories) => {
      if (categories) {
        const categoryGroup = getCategoryGroup(categories);
        setCategoryGroup(categoryGroup);
      }
    }).catch(() => {
      console.log('failed to load categories')
    })
  }, [])

  const toggleCategoryFilterModal = useCallback(() => {
    setIsCategoryModalVisible(!isCategoryModalVisible);
  }, [isCategoryModalVisible]);

  const updateCategory = (category: Category | undefined) => {
    setCategory(category);
    toggleCategoryFilterModal();
  }

  return (
    <div className={styles.container}>
      <Header title='我的账本'>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <div></div>
      </Header>
      <CategoryModal
        defaultCategory={category}
        categoryGroup={categoryGroup}
        visible={isCategoryModalVisible}
        onCancel={toggleCategoryFilterModal}
        onConfirm={updateCategory}
      />
    </div>
  )
}

export default Home