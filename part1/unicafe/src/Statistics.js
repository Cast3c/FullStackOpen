const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const totalGood = (good / all) * 100;

  if (all === 0) {
    return <h1>No feedback given</h1>;
  }

  return (
    <div>
      <table>
        <tbody>
            <tr>
               <td>good </td>
               <td>{good}</td> 
            </tr>
            <tr>
                <td>neutral</td>
                <td>{neutral}</td>
            </tr>
            <tr>
                <td>bad</td>
                <td>{bad}</td>
            </tr>
            <tr>
                <td>all</td>
                <td>{all}</td>
            </tr>
            <tr>
                <td>average </td>
                <td>{average}</td>
            </tr>
            <tr>
                <td>positive </td>
                <td>{totalGood}%</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
