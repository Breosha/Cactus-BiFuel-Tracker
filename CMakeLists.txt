cmake_minimum_required(VERSION 3.20)
project(CactusBiofuelTracker LANGUAGES CXX)

include(CTest)

add_library(biofuel_calculator src/BiofuelCalculator.cpp)
target_include_directories(biofuel_calculator PUBLIC include)
target_compile_features(biofuel_calculator PUBLIC cxx_std_17)

add_executable(cactus-biofuel-tracker src/main.cpp)
target_link_libraries(cactus-biofuel-tracker PRIVATE biofuel_calculator)

if(BUILD_TESTING)
    add_executable(biofuel_calculator_tests tests/BiofuelCalculatorTests.cpp)
    target_link_libraries(biofuel_calculator_tests PRIVATE biofuel_calculator)
    add_test(NAME biofuel_calculator_tests COMMAND biofuel_calculator_tests)
endif()
