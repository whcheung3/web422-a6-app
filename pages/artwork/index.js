import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    page > 1 && setPage(page - 1);
  }
  function nextPage() {
    page < artworkList.length && setPage(page + 1);
  }

  useEffect(() => {
    if (data) {
      setArtworkList(data);
      if (data != null && data != undefined) {
        let results = [];
        for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
          const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
          results.push(chunk);
        }
        setArtworkList(results);
      }
    }
    setPage(1);
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  } else if (artworkList == null || artworkList == undefined) {
    return null;
  } else {
    if (artworkList.length > 0)
      return (
        <>
          <Row className="gy-4">
            {artworkList[page - 1].map((artwork) => (
              <Col lg={3} key={artwork}>
                <ArtworkCard objectID={artwork} />
              </Col>
            ))}
          </Row>
          <br />
          <Row>
            <Col>
              <Pagination disabled={artworkList.length <= 0}>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>
      );
    else if (artworkList.length == 0)
      return (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>Try searching for something else.
            </Card.Text>
          </Card.Body>
        </Card>
      );
  }
}