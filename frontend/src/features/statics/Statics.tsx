import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const data = {
    labels: ['Placeholder'],
    datasets: [
        {
            label: 'Sample Data',
            data: [50],
            backgroundColor: '#1976D2', // Adjust as needed
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Hides legend - you can adjust this as per your requirements.
        },
        animation: {
            duration: 1000,
            easing: 'linear',
        }
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const Statics: React.FC = () => {
    return (
        <div style={{ flexGrow: 1, padding: 16 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <StyledPaper>
                        <Bar key="chart1" data={data} options={options} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledPaper>
                        <Bar key="chart2" data={data} options={options} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <Bar key="chart3" data={data} options={options} />
                    </StyledPaper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Statics;