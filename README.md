# Fast Document Deskew


## Method

Two commonly used approaches for deskewing documents are:
1. Hough Transform [[2]](https://muthu.co/skew-detection-and-correction-of-document-images-using-hough-transform/)
2. Horizontal Projection [[1]](https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/)

The algorithm implemented here is a simple and fast projection-based method I invented. This is basically a modification of the method introduced in [[1]](https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/). I found out that applying maximum/minimum filters then computing the difference (implemented using 1D max-pooling operations) is a very reasonable and effective way to extract "peak signals" from the horizontal projection profile. To the best of my knowledge, this is the first such attempt in image deskewing task.


[1] https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/

[2] https://muthu.co/skew-detection-and-correction-of-document-images-using-hough-transform/


## Contact

hermercur@gmail.com