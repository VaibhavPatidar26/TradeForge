cmake_minimum_required(VERSION 3.10)
project(ExchangeEngine CXX)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

add_executable(ExchangeEngine
    src/main.cpp
    src/OrderBook.cpp
    src/MatchingEngine.cpp
    src/MarketMaker.cpp
)
