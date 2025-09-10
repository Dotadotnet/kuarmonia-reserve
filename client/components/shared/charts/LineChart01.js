import { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  CategoryScale, // اضافه کردن مقیاس category
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// ثبت مقیاس‌ها و سایر اجزا
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);

function LineChart01({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas.current) return; // Ensure the canvas is available

    const ctx = canvas.current.getContext('2d'); // Get 2d context

    // Initialize the chart
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            type: 'category', // استفاده از مقیاس category
            display: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => `تعداد: ${context.parsed.y}`, // Basic label without formatting
            },
            bodyColor: '#333333', // Default tooltip body color
            backgroundColor: '#ffffff', // Default tooltip background color
            borderColor: '#cccccc', // Default tooltip border color
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });

    // Cleanup on unmount
    return () => {
      newChart.destroy();
    };
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default LineChart01;
