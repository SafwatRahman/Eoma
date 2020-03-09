import React, { Component } from "react";

class Processing extends Component {
  state = {
    activities: this.props.activities,
    categories: []
  };

  findFoodCategory = activities => {
    const productivityWordBank = [
      "work",
      "working",
      "busy",
      "employment",
      "laboring",
      "job",
      "tasks",
      "homework",
      "assignment",
      "studying",
      "writing",
      "thinking",
      "reading",
      "emails",
      "lecture",
      "class",
      "school"
    ];
    const leisureWordBank = [
      "relaxing",
      "free",
      "nothing",
      "netflix",
      "chilling",
      "holiday",
      "treating myself",
      "break",
      "unemployed",
      "bored",
      "tv",
      "stress relief"
    ];
    const stressWordBank = [
      "exam",
      "test",
      "presentation",
      "interview",
      "phone interview",
      "finals",
      "midterm",
      "final",
      "midterms",
      "first date",
      "performance"
    ];
    const wordBanks = [productivityWordBank, leisureWordBank, stressWordBank];
    let categories = [];
    // loop through each bank
    for (let i = 0; i < wordBanks.length; ++i) {
      // check if bank contains activity
      for (let j = 0; j < activities.length; ++j) {
        let activityString = activities[j].trim().toLowerCase();
        if (wordBanks[i].includes(activityString)) {
          categories.push(i); // record which bank the activity belongs to
          break; // if found, move to next bank
        } else {
          continue; // else, continue searching
        }
      }
    }
    console.log(categories);
    this.setState({
      categories
    });
  };

  render() {
    return null;
  }
}

export default Processing;
