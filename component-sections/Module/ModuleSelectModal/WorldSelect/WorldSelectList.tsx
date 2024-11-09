import { useGetModuleTypeAvailableTags } from '../../../../api/tags/useGetModuleTypeAvailableTags';
import { PbModuleType, PbViewTag } from '../../../../generated/api-types/data-contracts';
import React, { Suspense, useCallback } from 'react';
import { useGetWorlds } from '../../../../api/worlds/useGetWorlds';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../../components/Flex/Flex';
import LoadingText from '../../../../components/Loading/LoadingText';
import InfiniteScrollObserver from '../../../../components/InfiniteScrollObserver/InfiniteScrollObserver';
import WorldCard from '../../../../components/WorldCard/WorldCard';
import { TitleH3 } from '../../../../components/Typography/Title';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import TagButtonBox from '../../../../components/TagButtonBox/TagButtonBox';

interface WorldSelectListProps {
  selectedWorldId?: number;
  setSelectedWorldId?: (id: number) => void;
}

const WorldSelectList: React.FC<WorldSelectListProps> = ({
  selectedWorldId,
  setSelectedWorldId,
}) => {
  const { data: tags = [], isPending: isPendingGet } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_WORLD,
  });
  const [selectedTags, setSelectedTags] = React.useState<PbViewTag[]>([]);
  const [showOnlyPublic, setShowOnlyPublic] = React.useState<boolean>(false);

  const {
    data: worldsData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetWorlds({
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
            {worldsData?.pages.map(
              (page) =>
                page.worldIds?.map((worldId) => (
                  <Suspense fallback={null} key={worldId}>
                    <WorldCard
                      worldId={worldId}
                      onWorldSelected={setSelectedWorldId}
                      selected={worldId === selectedWorldId}
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

export default WorldSelectList;
