```markdown
# Backend Task

## Data Source

- **THIRD PARTY API URL**: [https://s3.amazonaws.com/roxiler.com/product\_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **REQUEST METHOD**: GET
- **RESPONSE FORMAT**: JSON

---

## Task Overview

### 1. **Initialize Database**

- Create an API to fetch the JSON data from the third-party API.
- Seed the database with the fetched data.
- Define an efficient table/collection structure.

---

## Instructions for All APIs

- All APIs should accept a `month` as input (expected value: any month between January to December).
- The `month` input should match against the `dateOfSale` field, regardless of the year.

---

### 2. **List All Transactions**

#### Endpoint

**GET**: `/transactions`

#### Features:

- Supports **search** and **pagination** on product transactions.
- Matches search text against `title`, `description`, and `price` fields.
- If no search parameter is provided, return all records for the specified page.
- Default pagination values:
  - `page = 1`
  - `per page = 10`

---

### 3. **Statistics**

#### Endpoint

**GET**: `/statistics`

#### Features:

- Calculates the following for the selected month:
  - Total sale amount.
  - Total number of sold items.
  - Total number of unsold items.

---

### 4. **Bar Chart Data**

#### Endpoint

**GET**: `/barchart`

#### Features:

- Returns the price ranges and the number of items in each range for the selected month.
- Price ranges:
  - 0 - 100
  - 101 - 200
  - 201 - 300
  - 301 - 400
  - 401 - 500
  - 501 - 600
  - 601 - 700
  - 701 - 800
  - 801 - 900
  - 901 and above

---

### 5. **Pie Chart Data**

#### Endpoint

**GET**: `/piechart`

#### Features:

- Finds unique categories and the number of items in each category for the selected month.
- Example response:
  - **X category**: 20 items
  - **Y category**: 5 items
  - **Z category**: 3 items

---

### 6. **Combined Data API**

#### Endpoint

**GET**: `/combined-data`

#### Features:

- Fetches data from the following APIs:
  1. `/statistics`
  2. `/barchart`
  3. `/piechart`
- Combines the responses and returns a final combined JSON object.

---

# Frontend Task

By using the above-created APIs, create the following table and charts on a single page. Follow the given mockups, and you can implement your own design to change the look and feel.

---

## Transactions Table

- Use your transactions listing API to list transactions in the table.
- A dropdown should display months (January to December) as options, with March selected by default.
- The table should list transactions for the selected month, regardless of the year, using the API.
- A search box should allow users to input text. Matching transactions (based on `title`, `description`, or `price`) for the selected month should be displayed using the API.
- Clearing the search box should display the initial list of transactions for the selected month.
- **Pagination:**
  - "Next" loads the next page's data from the API.
  - "Previous" loads the previous page's data from the API.

---

## Transactions Statistics

- Use the statistics API to fetch and display:
  - Total sale amount.
  - Total sold items.
  - Total unsold items.
- Data should reflect the month selected in the dropdown above the table.

---

## Transactions Bar Chart

- Use the bar chart API to fetch and display data.
- Chart should show price ranges and the number of items in each range for the selected month, regardless of the year.
- Month selected from the dropdown above the table should apply here as well.
```

