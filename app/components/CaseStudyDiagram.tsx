/** Shared SVG paths keep the animated signals exactly on their connectors. */
export function CaseStudyDiagram({ variant }: { variant: "listening" | "grants" }) {
  const listening = variant === "listening";
  const route = listening
    ? "M174 188H202C232 188 244 230 274 230S320 150 355 150S400 242 440 242S502 145 552 145"
    : "M112 232V264Q112 276 124 276H288Q300 276 300 264V244H430Q444 244 444 232V210";
  return (
    <div className={`case-diagram ${listening ? "case-diagram-dark" : "case-diagram-light"}`}>
      <svg viewBox="0 0 620 380" role="img" aria-label={listening ? "Connected sources flowing into a live sentiment view" : "Approved evidence flowing into a draft and human review"}>
        {listening ? <>
          <text x="40" y="49" className="diagram-title">Live sentiment</text>
          {[105, 165, 225, 285].map((y) => <path key={y} d={`M198 ${y}H575`} className="diagram-grid" />)}
          {[250, 325, 400, 475, 550].map((x) => <path key={x} d={`M${x} 86V290`} className="diagram-grid" />)}
          {[100, 174, 248].map((y, i) => <g key={y}>
            <rect x="43" y={y} width="58" height="48" rx="7" className="diagram-source" />
            {i === 0 ? <path d={`M58 ${y+14}h27v16H70l-7 5v-5h-5z`} className="diagram-icon" /> : i === 1 ? <path d={`M59 ${y+12}h24v26H59z m5 8h14 m-14 6h14 m-14 6h9`} className="diagram-icon" /> : <g className="diagram-icon"><circle cx="72" cy={y+24} r="14"/><ellipse cx="72" cy={y+24} rx="6" ry="14"/><path d={`M58 ${y+24}h28`}/></g>}
            <path d={`M101 ${y+24}H128Q144 ${y+24} 144 ${y+24+(i===2?-12:12)}V176Q144 188 156 188H174`} className="diagram-connector" />
          </g>)}
          <path d={route} className="diagram-route" />
          <text x="43" y="344" className="diagram-caption">Sources connected</text>
        </> : <>
          {[{x:42,y:54,w:166,h:196,label:"Evidence"},{x:228,y:111,w:166,h:210,label:"Draft"},{x:412,y:66,w:166,h:226,label:"Reviewed"}].map(({x,y,w,h,label},i) => <g key={label}>
            <rect x={x+2} y={y+6} width={w} height={h} rx="3" fill="#11100f" opacity=".045" />
            <rect x={x} y={y} width={w} height={h} rx="3" fill="#faf9f5" stroke="#c9c5bb" />
            <text x={x+19} y={y+38} className="diagram-title">{label}</text>
            {i===2 ? <g className="diagram-review"><circle cx={x+83} cy={y+99} r="27"/><path d={`M${x+69} ${y+98}l10 10 20-23`}/></g> : <rect x={x+20} y={y+63} width="32" height="39" fill="none" stroke="#d5d1c7" />}
            {[0,1,2,3].map((line) => <path key={line} d={`M${x+20} ${y+h-66+line*13}h${line===3?76:124}`} stroke="#d5d1c7" />)}
          </g>)}
          <path d={route} className="diagram-connector" />
        </>}
        <path d={route} pathLength="100" className="diagram-flow" />
      </svg>
    </div>
  );
}
