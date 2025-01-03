import { PbModuleType } from '../../../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../index';
import { setModuleListLayout } from '../../globalSlice';
import { LayoutToggleGroupOption } from '../../../components/LayoutToggleGroup/layoutToggleGroupLib';

export const useModuleListLayout = (
  moduleType: PbModuleType,
): [LayoutToggleGroupOption | undefined, (value: LayoutToggleGroupOption) => void] => {
  const dispatch = useDispatch();
  const layout = useSelector((state: ReduxState) => state.global.moduleListLayout[moduleType]);

  console.log({ layout });

  return useMemo(
    () => [
      layout,
      (value: LayoutToggleGroupOption) => dispatch(setModuleListLayout({ moduleType, value })),
    ],
    [dispatch, layout, moduleType],
  );
};
