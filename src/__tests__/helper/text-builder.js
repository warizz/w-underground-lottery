import TextBuilder from '../../helper/text-builder';

it('should return expected result when call buildTicketSummary()', () => {
  const result = TextBuilder.buildTicketSummary('1', 100, 200);
  expect(result).toBe('1 = บน 100 ล่าง 200');
});

it('should return expected result when call buildTicketSummary()', () => {
  const result = TextBuilder.buildTicketSummary('12', 10, 20);
  expect(result).toBe('12 = บน 10 ล่าง 20');
});

it('should return expected result when call buildTicketSummary()', () => {
  const result = TextBuilder.buildTicketSummary('123', 10, 20, 30);
  expect(result).toBe('123 = เต็ง 10 โต๊ด 20 ล่าง 30');
});

it('should return expected result when call buildTicketSummary()', () => {
  const result = TextBuilder.buildTicketSummary('123', undefined, undefined, 30);
  expect(result).toBe('123 = ล่าง 30');
});
