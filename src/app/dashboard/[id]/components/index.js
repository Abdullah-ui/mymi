export const generateInterviewData = () => {
    const categories = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Algorithms'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return categories.map(category => ({
        name: category,
        data: months.map(() => Math.floor(Math.random() * 150) + 50)
    }));
};

export const options = {
    chart: {
        type: 'area',
        height: 450,
        stacked: false,
        background: 'transparent',
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
            }
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    colors: [
        '#E8F4FD', // Light blue
        '#F0F9FF', // Lighter blue
        '#E0F2FE', // Sky blue
        '#F7FEE7', // Light green
        '#FEF3C7', // Light yellow
        '#FDF2F8', // Light pink
        '#F3E8FF', // Light purple
        '#ECFDF5'  // Light mint
    ],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            type: 'vertical',
            colorStops: [
                {
                    offset: 0,
                    color: undefined,
                    opacity: 0.8
                },
                {
                    offset: 100,
                    color: undefined,
                    opacity: 0.1
                }
            ]
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2,
        colors: [
            '#3B82F6', // Blue
            '#06B6D4', // Cyan
            '#0EA5E9', // Light blue
            '#22C55E', // Green
            '#F59E0B', // Amber
            '#EC4899', // Pink
            '#8B5CF6', // Purple
            '#10B981'  // Emerald
        ]
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '12px',
        fontWeight: 500,
        markers: {
            width: 8,
            height: 8,
            radius: 4
        },
        itemMargin: {
            horizontal: 12,
            vertical: 4
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            style: {
                colors: '#6B7280',
                fontSize: '12px',
                fontWeight: 500
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        grid: {
            show: false
        }
    },
    yaxis: {
        title: {
            text: 'Number of Interviews',
            style: {
                color: '#6B7280',
                fontSize: '12px',
                fontWeight: 600
            }
        },
        labels: {
            style: {
                colors: '#6B7280',
                fontSize: '12px'
            },
            formatter: function (value) {
                return Math.round(value);
            }
        },
        grid: {
            borderColor: '#F3F4F6',
            strokeDashArray: 3
        }
    },
    grid: {
        show: true,
        borderColor: '#F3F4F6',
        strokeDashArray: 3,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        theme: 'dark',
        style: {
            fontSize: '12px'
        },
        y: {
            formatter: function (value, { seriesName }) {
                return `<span style="font-weight: 600;">${value}</span> ${seriesName} interviews`;
            }
        }
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center'
                },
                chart: {
                    height: 350
                }
            }
        }
    ]
};