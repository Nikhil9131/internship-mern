class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // ================= SEARCH =================
  search() {
    if (this.queryStr.keyword) {
      const keyword = {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      };

      this.query = this.query.find(keyword);
    }

    return this;
  }

  // ================= FILTER =================
  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove API-only fields
    const removeFields = [
      "keyword",
      "page",
      "limit",
      "sort",
      "fields",
      "inStock",
    ];

    removeFields.forEach((field) => {
      delete queryCopy[field];
    });

    // ================= CATEGORY =================
    if (queryCopy.category) {
      queryCopy.category = {
        $in: queryCopy.category.split(","),
      };
    }

    // ================= COMPARISON OPERATORS =================
    // Supports:
    // ?price[gte]=500
    // ?price[lte]=1000
    // ?price[gt]=500
    // ?price[lt]=1000

    let queryString = JSON.stringify(queryCopy);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const filters = JSON.parse(queryString);

    // ================= IN STOCK =================
    // IMPORTANT:
    // Add $gt AFTER the operator replacement.
    // Otherwise $gt becomes $$gt.

    if (this.queryStr.inStock === "true") {
      filters.stock = {
        $gt: 0,
      };
    }

    // ================= OUT OF STOCK =================
    if (this.queryStr.inStock === "false") {
      filters.stock = {
        $eq: 0,
      };
    }

    this.query = this.query.find(filters);

    return this;
  }

  // ================= SORT =================
  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // ================= PAGINATION =================
  paginate(defaultLimit) {
  let limit = Number(this.queryStr.limit) || defaultLimit;
  let page = Number(this.queryStr.page) || 1;

  // Prevent invalid values
  if (limit < 1) {
    limit = defaultLimit;
  }

  if (page < 1) {
    page = 1;
  }

  // Prevent huge requests
  if (limit > 100) {
    limit = 100;
  }

  const skip = limit * (page - 1);

  this.query = this.query
    .limit(limit)
    .skip(skip);

  this.limitValue = limit;
  this.pageValue = page;

  return this;
}

  // ================= FIELD LIMITING =================
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields
        .split(",")
        .join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
}

module.exports = APIFeatures;