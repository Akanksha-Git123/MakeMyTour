import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getflight } from "../../lib/api";
import Loader from "../Loader";

interface FlightListProps {
  onSelect: (flight: any) => void;
}

const FlightList = ({ onSelect }: FlightListProps) => {
  const [flight, setflight] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchflight = async () => {
      try {
        const response = await getflight();

        // Fix: use response.data instead of full axios response
        setflight(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };

    fetchflight();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Flight List</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {flight.length > 0 ? (
            flight.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>{item.flightName}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(item)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlightList;