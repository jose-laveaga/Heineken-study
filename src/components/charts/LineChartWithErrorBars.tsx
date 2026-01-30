interface SeriesPoint {
    value: number;
    error: number;
}

interface SeriesDefinition {
    label: string;
    color: string;
    points: SeriesPoint[];
}

interface LineChartWithErrorBarsProps {
    xLabels: string[];
    xAxisLabel: string;
    yAxisLabel: string;
    series: SeriesDefinition[];
    ariaLabel: string;

    // optional axis config
    yMin?: number;
    yMax?: number;
    yTicks?: number;
    showGrid?: boolean;
}

const LineChartWithErrorBars = ({
                                    xLabels,
                                    xAxisLabel,
                                    yAxisLabel,
                                    series,
                                    ariaLabel,
                                    yMin = 0,
                                    yMax = 1,
                                    yTicks = 5,
                                    showGrid = true
                                }: LineChartWithErrorBarsProps) => {
    const width = 420;
    const height = 200;
    const padding = { top: 20, right: 20, bottom: 32, left: 48 }; // widened for y tick labels
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const xPositions = xLabels.map((_, index) =>
        padding.left + (plotWidth / Math.max(1, xLabels.length - 1)) * index
    );

    const clamp = (v: number) => Math.min(yMax, Math.max(yMin, v));
    const tFromValue = (v: number) => (clamp(v) - yMin) / (yMax - yMin || 1); // 0..1
    const yScale = (value: number) => padding.top + (1 - tFromValue(value)) * plotHeight;

    const buildPath = (points: SeriesPoint[]) =>
        points
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xPositions[index]} ${yScale(point.value)}`)
            .join(' ');

    // y ticks + labels
    const tickCount = Math.max(2, Math.floor(yTicks));
    const yTickValues = Array.from({ length: tickCount }, (_, i) => {
        const t = i / (tickCount - 1); // 0..1
        return yMin + (yMax - yMin) * t;
    });

    const formatTick = (v: number) => {
        // keep clean for 0..1; otherwise a compact numeric
        if (yMax <= 1.000001 && yMin >= -0.000001) return v.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
        return Number.isInteger(v) ? String(v) : v.toFixed(2);
    };

    return (
        <div className="space-y-2">
            <div className="relative h-44 w-full">
                <svg className="h-full w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
                    {/* grid (horizontal + vertical) */}
                    {showGrid && (
                        <g>
                            {yTickValues.map((v) => {
                                const y = yScale(v);
                                return (
                                    <line
                                        key={`ygrid-${v}`}
                                        x1={padding.left}
                                        y1={y}
                                        x2={width - padding.right}
                                        y2={y}
                                        stroke="#e2e8f0"
                                        strokeWidth={1}
                                    />
                                );
                            })}
                            {xPositions.map((x, idx) => (
                                <line
                                    key={`xgrid-${idx}`}
                                    x1={x}
                                    y1={padding.top}
                                    x2={x}
                                    y2={height - padding.bottom}
                                    stroke="#e2e8f0"
                                    strokeWidth={1}
                                />
                            ))}
                        </g>
                    )}

                    {/* axes */}
                    <line
                        x1={padding.left}
                        y1={padding.top}
                        x2={padding.left}
                        y2={height - padding.bottom}
                        stroke="#cbd5f5"
                        strokeWidth={2}
                    />
                    <line
                        x1={padding.left}
                        y1={height - padding.bottom}
                        x2={width - padding.right}
                        y2={height - padding.bottom}
                        stroke="#cbd5f5"
                        strokeWidth={2}
                    />

                    {/* y-axis tick labels */}
                    <g>
                        {yTickValues.map((v) => {
                            const y = yScale(v);
                            return (
                                <g key={`ytick-${v}`}>
                                    <line
                                        x1={padding.left - 4}
                                        y1={y}
                                        x2={padding.left}
                                        y2={y}
                                        stroke="#94a3b8"
                                        strokeWidth={1}
                                    />
                                    <text
                                        x={padding.left - 8}
                                        y={y + 3}
                                        textAnchor="end"
                                        fontSize="10"
                                        fill="#64748b"
                                    >
                                        {formatTick(v)}
                                    </text>
                                </g>
                            );
                        })}
                    </g>

                    {/* series + error bars */}
                    {series.map((entry) => (
                        <g key={entry.label}>
                            <path d={buildPath(entry.points)} fill="none" stroke={entry.color} strokeWidth={2.5} />
                            {entry.points.map((point, pointIndex) => {
                                const x = xPositions[pointIndex];
                                const y = yScale(point.value);
                                const errorTop = yScale(point.value + point.error);
                                const errorBottom = yScale(point.value - point.error);

                                return (
                                    <g key={`${entry.label}-${pointIndex}`}>
                                        <line x1={x} y1={errorTop} x2={x} y2={errorBottom} stroke={entry.color} strokeWidth={1.5} />
                                        <line x1={x - 6} y1={errorTop} x2={x + 6} y2={errorTop} stroke={entry.color} strokeWidth={1.5} />
                                        <line
                                            x1={x - 6}
                                            y1={errorBottom}
                                            x2={x + 6}
                                            y2={errorBottom}
                                            stroke={entry.color}
                                            strokeWidth={1.5}
                                        />
                                        <circle cx={x} cy={y} r={4} fill={entry.color} />
                                    </g>
                                );
                            })}
                        </g>
                    ))}

                    {/* x labels */}
                    {xLabels.map((label, index) => (
                        <text
                            key={label}
                            x={xPositions[index]}
                            y={height - 10}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#64748b"
                        >
                            {label}
                        </text>
                    ))}
                </svg>

                {/* legend */}
                <div className="absolute right-3 top-3 rounded-lg border border-slate-200 bg-white/90 px-2 py-1 text-[11px] text-slate-600 shadow-sm">
                    {series.map((entry, index) => (
                        <div key={entry.label} className={index === 0 ? 'flex items-center gap-2' : 'mt-1 flex items-center gap-2'}>
                            <span className="h-2 w-4 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span>{entry.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-600">X-axis: {xAxisLabel}</span>
                <span className="font-medium text-slate-600">Y-axis: {yAxisLabel}</span>
            </div>
        </div>
    );
};

export default LineChartWithErrorBars;
