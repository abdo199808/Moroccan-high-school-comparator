import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fakeSchoolsData = [
  {
    name: "ثانوية محمد الخامس",
    city: "الرباط",
    classes: 32,
    teachers: 54,
    students: 1280,
    reputation: 4.5,
  },
  {
    name: "ثانوية الكندي",
    city: "فاس",
    classes: 28,
    teachers: 45,
    students: 1100,
    reputation: 4.2,
  },
  {
    name: "ثانوية ابن بطوطة",
    city: "مراكش",
    classes: 35,
    teachers: 60,
    students: 1400,
    reputation: 4.7,
  },
];

export default function App() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [resultsVisible, setResultsVisible] = useState(false);

  const search = (query) =>
    fakeSchoolsData.filter((school) =>
      school.name.toLowerCase().includes(query.toLowerCase())
    );

  const compareSchools = () => {
    setResultsVisible(true);
  };

  const renderSuggestions = (query, onSelect) =>
    query &&
    search(query).map((school, idx) => (
      <div
        key={idx}
        className="suggestion"
        onClick={() => {
          onSelect(school);
        }}
      >
        {school.name}
      </div>
    ));

  const comparisonData =
    selected1 && selected2
      ? [
          { name: "الأقسام", [selected1.name]: selected1.classes, [selected2.name]: selected2.classes },
          { name: "الأساتذة", [selected1.name]: selected1.teachers, [selected2.name]: selected2.teachers },
          { name: "التلاميذ", [selected1.name]: selected1.students, [selected2.name]: selected2.students },
          { name: "السمعة", [selected1.name]: selected1.reputation, [selected2.name]: selected2.reputation },
        ]
      : [];

  return (
    <div className="App" dir="rtl">
      <h2>مقارنة الثانويات المغربية</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ flex: 1 }}>
          <label>أدخل اسم الثانوية الأولى:</label>
          <input value={query1} onChange={(e) => {
            setQuery1(e.target.value);
            setSelected1(null);
          }} placeholder="مثال: ثانوية محمد الخامس" />
          {renderSuggestions(query1, (s) => {
            setSelected1(s);
            setQuery1(s.name);
          })}
        </div>
        <div style={{ flex: 1 }}>
          <label>أدخل اسم الثانوية الثانية:</label>
          <input value={query2} onChange={(e) => {
            setQuery2(e.target.value);
            setSelected2(null);
          }} placeholder="مثال: ثانوية الكندي" />
          {renderSuggestions(query2, (s) => {
            setSelected2(s);
            setQuery2(s.name);
          })}
        </div>
      </div>
      <button onClick={compareSchools}>قارن</button>

      {resultsVisible && selected1 && selected2 && (
        <>
          <h3>نتائج المقارنة:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={selected1.name} fill="#4a90e2" />
              <Bar dataKey={selected2.name} fill="#e24a4a" />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: "30px" }}>
            <h4>تعليقات المستخدمين:</h4>
            <textarea
              style={{ width: "100%", minHeight: "80px" }}
              placeholder="اكتب رأيك أو ملاحظتك..."
            />
          </div>
        </>
      )}
    </div>
  );
    }
