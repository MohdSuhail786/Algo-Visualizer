import { Route, Switch } from "react-router";
import Header from "./components/header/Header";
import Sorting from "./components/sorting/Sorting";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <>
            <Header sortMethod="Bubble Sort"/>
            <Sorting sortMethod="Bubble Sort" />
          </>
        </Route>
        <Route exact path="/Bubble_Sort">
          <>
            <Header sortMethod="Bubble Sort"/>
            <Sorting sortMethod="Bubble Sort"/>
          </>
        </Route>
        <Route exact path="/Selection_Sort">
          <>
            <Header sortMethod="Selection Sort"/>
            <Sorting sortMethod="Selection Sort" />
          </>
        </Route>
        <Route exact path="/Insertion_Sort">
          <>
            <Header sortMethod="Insertion Sort"/>
            <Sorting sortMethod="Insertion Sort" />
          </>
        </Route>
      </Switch>
    </>
  );
}

export default App;
