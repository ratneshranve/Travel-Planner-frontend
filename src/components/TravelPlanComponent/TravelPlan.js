import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
import "./TravelPlan.css";
import { itineraryApi } from "../../apiurl";

function TravelPlan() {
  const location = useLocation();
  const data = location.state;

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null); // 🔁 Ref to the printable section

  useEffect(() => {
    if (!data) return;

    const prompt = `
You are a professional travel planner.

Generate a ${data.days}-day itinerary for a ${data.tripType} trip from ${data.from} to ${data.to}, starting on ${data.startDate}, for ${data.people} people, with a ₹${data.budget} total budget.
Traveler interests include: ${data.interests}.
Include:
1. **Trip Summary**: Dates, group type, total budget.
2. **Travel Options**: Recommend best mode (flight/train/bus) with real provider names, departure/arrival times, and cost.
3. **Hotel Suggestion**: Hotel/guesthouse name, location, nightly cost.
dont give links
4. **Daily Plan**: 
   - Food: Places for breakfast, lunch, dinner
   - Activities (3–5 per day with times)
   - One local tip per day ⚡
5. **Budget Breakdown**: Total cost per category (travel, stay, food, activities)
6. 💡 One budget-saving tip

Only use real places, restaurants, and transport providers. Be concise, practical, and budget-conscious.
`;

    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await fetch(itineraryApi+"generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const json = await res.json();
        const markdown = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        setPlan(markdown || "No response from Gemini.");
      } catch (error) {
        console.error("Fetch error:", error);
        setPlan("Failed to generate plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [data]);

  const renderHTML = (markdown) =>
    DOMPurify.sanitize(marked(markdown || ""));

  const downloadAsPDF = () => {
    if (!printRef.current) return;

    const options = {
      margin: 0.5,
      filename: `Itinerary-${data.destination}-${data.startDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(printRef.current).save();
  };

  return (
    <div className="travel-container">
      <div className="travel-box">
        <h2 className="travel-title">
          Your {data?.days}-Day Itinerary for {data?.destination}
        </h2>

        {loading ? (
          
          <p className="travel-loading">Generating itinerary...
          <p className="travel-loading">Please Wait Few seconds</p></p>
        ) : (
          <>
            <div
              ref={printRef}
              className="travel-plan-text"
              dangerouslySetInnerHTML={{ __html: renderHTML(plan) }}
            />
            <button className="download-btn" onClick={downloadAsPDF}>
              Download as PDF 📄
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TravelPlan;
