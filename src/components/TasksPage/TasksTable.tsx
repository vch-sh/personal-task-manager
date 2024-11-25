import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TasksTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Text</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden sm:table-cell">Priority</TableHead>
          <TableHead className="hidden sm:table-cell">Due Date</TableHead>
          <TableHead className="">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>2</TableCell>
          <TableCell>3</TableCell>
          <TableCell className="hidden sm:table-cell">4</TableCell>
          <TableCell className="hidden sm:table-cell">5</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
