export interface IRentable {
  /**
   * Calculates the rental price for a given number of days.
   * @param days The number of days for the rental period.
   * @returns The total rental price.
   */
  calculateRentalPrice(days: number): number;
}
