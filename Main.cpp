#include <iostream>
#include <string>
#include "fuelCalculator.h"
using namespace std;

int main() {
    string type;
    double massKg ;
    double moisturPercent ;
    double conversionRate ;
  cout << "Welcome to the Catus Bifuel Tracker " << endl;
  cout << "Enter Cactus Type: ";
  cin >> type
  cout << "Enter mass in kg: ";
  cin >> massKg;
  cout << "Enter moisture content percentage: ";
  cin >> moisturePercent;
  cout << "Enter conversion rate (liters/kg dry mass): ";
  cin >> conversionRate;

 double fuelYield = calculateFuelYield(massKg, moisturePercent, conversionRate);
 cout << "Estimated fuel yield for " << type << ": " << fuelYield << " liters" << endl;

  return 0;
}
