
import Body from "@/components/Body/Body";

function apiTest() {


    fetch('/api/series/getAllSeriesSummary',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });


  return (
    <>
      <p className="test">Home</p>

      <Body center></Body>
    </>
  );
}

export default apiTest;
