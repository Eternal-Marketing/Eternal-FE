import ColumnPageContent from './ColumnPageContent';

/**
 * 칼럼 목록 페이지 (/column)
 * - 바이럴 마케팅이 기본 선택, 내용은 ColumnPageContent에서 카테고리 탭·픽처드·그리드 공통 사용
 */
export default function ColumnPage() {
  return <ColumnPageContent activeCategoryIndex={0} />;
}
