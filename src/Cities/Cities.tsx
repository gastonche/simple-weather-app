import React from "react";
import styles from "./Cities.module.css";

interface CitiesProps {
  cities: string[];
  currentIndex: number;
  onChange: (index: number) => void
}

class Cities extends React.Component<CitiesProps> {
  render(): React.ReactNode {
    return (
      <div className={styles.cities}>
        {this.props.cities.map((city, index) => (
          <span
            key={city}
            className={`${styles.city} ${
              index === this.props.currentIndex ? styles.active : ""
            }`}
            onClick={() => this.props.onChange(index)}
          >
            {city}
          </span>
        ))}
      </div>
    );
  }
}

export default Cities;
