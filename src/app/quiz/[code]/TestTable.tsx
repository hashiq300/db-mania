import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FieldPacket,
  OkPacket,
  ProcedureCallPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

export type TestTableProps = {
  resultFields: FieldPacket[];
  result:
    | OkPacket
    | RowDataPacket[]
    | ResultSetHeader[]
    | RowDataPacket[][]
    | OkPacket[]
    | ProcedureCallPacket;
};

export function TestTable({ result, resultFields }: TestTableProps) {
  return (
    <div className="px-10 mt-6">
      <Table className="w-full">
        <TableCaption>Test Answer</TableCaption>
        <TableHeader>
          <TableRow>
            {resultFields?.map((col) => (
              <TableHead key={col.name}>{col.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(result) &&
            result?.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((values, index) => (
                  <TableCell key={`val_${index}`}>{values}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
