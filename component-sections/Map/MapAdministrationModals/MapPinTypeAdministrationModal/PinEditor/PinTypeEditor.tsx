import React, { useCallback, useMemo } from 'react';
import { PbMapPinType, PbPinShape } from '../../../../../generated/api-types/data-contracts';
import PinBackgroundShapeSelect from '../PinBackgroundShape/PinBackgroundShapeSelect';
import Slider from '../../../../../components/Slider/Slider';
import { useUpdateMapPinType } from '../../../../../api/maps/useUpdateMapPinType';
import ErrorText from '../../../../../components/ErrorText/ErrorText';
import { useUrlModuleId } from '../../../../../hooks/useUrlModuleId';
import { useGetMapPinTypesAndGroups } from '../../../../../api/maps/useGetMapPinTypesAndGroups';
import { Col, Row } from '../../../../../components/Flex/Flex';
import { Label } from '../../../../../components/Typography/Label';

interface PinTypeEditorProps {
  pinTypeId: number;
}

const PinTypeEditor: React.FC<PinTypeEditorProps> = ({ pinTypeId }) => {
  const moduleId = useUrlModuleId();
  const { data: mapPinTypesAndGroups, isFetching: isPending } = useGetMapPinTypesAndGroups({
    variables: moduleId,
  });

  const pinData = useMemo(
    () => (mapPinTypesAndGroups?.pinTypes ?? []).find((x) => x.id === pinTypeId),
    [mapPinTypesAndGroups, pinTypeId],
  );
  const pinShape = pinData?.shape ?? PbPinShape.NONE;

  const {
    mutate: updateMapPinType,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateMapPinType();

  const onChangeHandler = useCallback(
    (body: Partial<Omit<PbMapPinType, 'id' | 'isDefault' | 'mapPinTypeGroupId'>>) => {
      updateMapPinType({
        moduleId,
        pinTypeId,
        body: {
          ...body,
        },
      });
    },
    [moduleId, pinTypeId, updateMapPinType],
  );

  const onChangePinShape = useCallback(
    (shape: PbPinShape) => onChangeHandler({ shape }),
    [onChangeHandler],
  );

  const onChangeBackgroundWidth = useCallback(
    (value: number[]) => onChangeHandler({ width: value[0] }),
    [onChangeHandler],
  );

  const loading = isPending || isPendingUpdate;

  return (
    <>
      <PinBackgroundShapeSelect selected={pinShape} onChange={onChangePinShape} />
      <PinIconSelect selected={pinIcon} onChange={onChangePinIcon} />
      <Col gap="sm" fullWidth>
        <Row gap="md" alignItems="center" fullWidth>
          <Row css={{ width: 150 }}>
            <Label>Background</Label>
          </Row>
          <Row grow alignItems="center" justifyContent="center">
            <Slider
              min={10}
              max={50}
              defaultValue={[pinData?.width ?? 30]}
              onValueCommit={onChangeBackgroundWidth}
              disabled={loading}
            />
          </Row>
          <Row css={{ width: 70 }}>{pinData?.width ?? 0}px</Row>
        </Row>
        <Row gap="md" alignItems="center" fullWidth>
          <Row css={{ width: 150 }}>
            <Label>Icon</Label>
          </Row>
          <Row grow alignItems="center" justifyContent="center">
            <Slider min={10} max={50} defaultValue={[pinData?.iconSize ?? 30]} disabled={loading} />
          </Row>
          <Row css={{ width: 70 }}>{pinData?.iconSize ?? 0}px</Row>
        </Row>
      </Col>
      <ErrorText error={errorUpdate} />
    </>
  );
};

export default PinTypeEditor;
