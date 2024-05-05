import React, { ChangeEventHandler, useCallback } from 'react';
import { PbMapPinTypeGroup } from '../../../../../generated/api-types/data-contracts';
import { useUrlModuleId } from '../../../../../hooks/useUrlModuleId';
import { useGetMapPinTypesAndGroups } from '../../../../../api/maps/useGetMapPinTypesAndGroups';
import MapPinType from './MapPinType';
import { useInput } from '../../../../../hooks/useInput';
import Input from '../../../../../components/Input/Input';
import { Col, Row } from '../../../../../components/Flex/Flex';
import { useUpdateMapPinTypeGroup } from '../../../../../api/maps/useUpdateMapPinTypeGroup';
import ErrorText from '../../../../../components/ErrorText/ErrorText';
import debounce from 'lodash.debounce';
import { Button } from '../../../../../components/Button/Button';
import { useCreateMapPinType } from '../../../../../api/maps/useCreateMapPinType';
import NewPinTypeButton from './NewPinTypeButton';

interface MapPinTypeGroupProps {
  data: PbMapPinTypeGroup;
}

const MapPinTypeGroup: React.FC<MapPinTypeGroupProps> = ({ data }) => {
  const moduleId = useUrlModuleId();
  const { data: mapPinTypesAndGroups, isFetching: isPending } = useGetMapPinTypesAndGroups({
    variables: moduleId,
  });

  const {
    mutate: updateMapPinTypeGroup,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateMapPinTypeGroup();

  const { value: titleValue, setValue: setTitleValue } = useInput(data.name ?? '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((id: number, newName: string) => {
      updateMapPinTypeGroup({
        moduleId,
        mapPinTypeGroupId: id,
        body: {
          name: newName,
        },
      });
    }, 1000),
    [],
  );

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!data.id) return;
      const newTitle = e.target.value;
      setTitleValue(newTitle);
      onChangeHandlerDebounced(data.id, newTitle);
    },
    [data.id, onChangeHandlerDebounced, setTitleValue],
  );

  const loading = isPending || isPendingUpdate;

  return (
    <Col gap="sm" padding="md" loading={loading} fullWidth>
      <Row fullWidth gap="sm">
        <Input
          fullWidth
          id={`map-pin-type-group-${data.id}`}
          value={titleValue}
          onChange={handleNameChange}
          aria-labelledby="Group name"
          placeholder="Group name"
          required
          disabled={loading}
          displayHelpers={false}
        />
      </Row>
      <ErrorText error={errorUpdate} />
      <Row fullWidth gap="sm">
        {(mapPinTypesAndGroups?.pinTypes ?? []).map((t) => (
          <MapPinType key={t.id} data={t} />
        ))}
        {data.id && <NewPinTypeButton moduleId={moduleId} mapPinTypeGroupId={data.id} />}
      </Row>
    </Col>
  );
};

export default MapPinTypeGroup;
