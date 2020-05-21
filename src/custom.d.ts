type RecordItem = {
  tags: TagItem;
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
  id?: number;
}

type TagItem = {
  name: string;
  value: string;
}


type RootState = {
  recordList: RecordItem[];
  tagList: TagItem[];
  currentRecord?: RecordItem;
  createRecordError: Error | null;
  createTagError: Error | null;
}

type Group = {
  name: string;
  items: RecordItem[];
}

type ChartGroup = {
  tag: TagItem;
  amount: number;
  percentage: number;
}