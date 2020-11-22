import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import axios from 'axios';
class Chart extends Component {
    state = {
        chartData: {
            labels: [], // get categories
            datasets: [
                {
                    label: 'Categories',
                    data: [], // get numbers of products
                    backgroundColor: [] // get random colors for each cat.
                }
            ]
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/stats/categories';
            const response = await axios({ method: 'get', url: `${apiUrl}` });

            const labelsResult = response.data.map(l => l.category);
            const numbersResult = response.data.map(n => n.numberOfProducts);
            const colors = response.data.map(c => c.numberOfProducts = `rgba(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, 0.9)`)

            this.setState({
                chartData: {
                    labels: labelsResult,
                    datasets: [
                        {
                            label: 'Categories',
                            data: numbersResult,
                            backgroundColor: colors
                        }
                    ]
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="chart">
                <Polar data={this.state.chartData} />
            </div>
        );
    }
}

export default Chart;