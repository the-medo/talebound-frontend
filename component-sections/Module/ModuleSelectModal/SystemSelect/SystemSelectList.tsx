import { useGetModuleTypeAvailableTags } from '../../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../../generated/api-types/data-contracts';
import React, { Suspense, useCallback } from 'react';
import { useGetSystems } from '../../../../api/systems/useGetSystems';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../../components/Flex/Flex';
import LoadingText from '../../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import SystemCard from '../../../../components/SystemCard/SystemCard';
import { TitleH3 } from '../../../../components/Typography/Title';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import TagButtonBox from '../../../../components/TagButtonBox/TagButtonBox';

interface SystemSelectListProps {
  selectedSystemId?: number;
  setSelectedSystemId?: (id: number) => void;
}

const SystemSelectList: React.FC<SystemSelectListProps> = ({
  selectedSystemId,
  setSelectedSystemId,
}) => {
  const { data: tags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
  });
  const [selectedTags, setSelectedTags] = React.useState<PbViewTag[]>([]);
  const [showOnlyPublic, setShowOnlyPublic] = React.useState<boolean>(false);

  const {
    data: systemsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetSystems({
    variables: {
      public: showOnlyPublic,
      tags: selectedTags.map((t) => t.id ?? 0),
    },
  });

  const onChangeShowOnlyPublic = useCallback((value: boolean) => {
    setShowOnlyPublic(value);
  }, []);

  return (
    <>
      <Row gap="md" alignItems="start" wrap>
        <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
          <ContentSection loading={isPendingGet} flexWrap="wrap" direction="column">
            <Row gap="md" fullWidth justifyContent="between">
              <TitleH3>Filters</TitleH3>
              <Row>
                <Checkbox
                  id="show-only-public"
                  defaultChecked={showOnlyPublic}
                  onCheckedChange={onChangeShowOnlyPublic}
                >
                  Show only public
                </Checkbox>
              </Row>
            </Row>
            <TagButtonBox
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              displayCount={true}
              showZeroCountToggle={true}
            />
          </ContentSection>

          <Row gap="md" alignItems="start" wrap>
            {systemsData?.pages.map(
              (page) =>
                page.systemIds?.map((systemId) => (
                  <Suspense fallback={null} key={systemId}>
                    <SystemCard
                      systemId={systemId}
                      onSystemSelected={setSelectedSystemId}
                      selected={systemId === selectedSystemId}
                      grow={false}
                      compact
                    />
                  </Suspense>
                )),
            )}
            {hasNextPage && !isFetching && <InfiniteScrollObserver runOnObserve={fetchNextPage} />}
          </Row>
          {isFetching && <LoadingText />}
        </Col>

        <Col css={{ flexGrow: 0, flexBasis: '400px' }}>Detail</Col>
      </Row>
    </>
  );
};

export default SystemSelectList;
