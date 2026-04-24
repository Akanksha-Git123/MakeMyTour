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
import { gethotel } from "../../lib/api";
import Loader from "../Loader";

interface HotelProps {
  onSelect: (hotel: any) => void;
}

const Hotel = ({ onSelect }: HotelProps) => {
  const [hotel, sethotel] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchhotel = async () => {
      try {
        const response = await gethotel();

        // Fix here
        sethotel(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };

    fetchhotel();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Hotel List</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hotel Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {hotel.length > 0 ? (
            hotel.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>{item.hotelName}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.price}</TableCell>
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

export default Hotel;