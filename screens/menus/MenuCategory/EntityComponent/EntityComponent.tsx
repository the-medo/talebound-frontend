import React from 'react';
import {
  PbEntityGroupDirection,
  PbEntityGroupStyle,
  PbEntityType,
} from '../../../../generated/api-types/data-contracts';
import { useEntity } from '../../../../hooks/useEntity';
import EntityPost from './EntityPost';

interface EntityComponentProps {
  entityId: number;
  groupStyle: PbEntityGroupStyle;
  groupDirection: PbEntityGroupDirection;
}

const EntityComponent: React.FC<EntityComponentProps> = ({ entityId, groupDirection }) => {
  const { entity } = useEntity(entityId);

  switch (entity?.type) {
    case PbEntityType.ENTITY_TYPE_POST:
      return <EntityPost postId={entity.postId ?? 0} groupDirection={groupDirection} />;
  }

  return (
    <div style={{ width: '100px', height: '100px', border: '2px solid red' }}>
      Entity Component{entityId}
    </div>
  );
};

export default EntityComponent;
