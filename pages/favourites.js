import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  return (
    <>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>Try adding some new artwork to the list.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
