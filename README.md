# Fast Document Deskew
https://cgkim412.github.io/fast-document-deskew/

## Method

The algorithm is implemented here: https://github.com/cgkim412/fast-document-deskew/blob/main/src/deskew.js

Two commonly used approaches for deskewing documents are:
1. Hough Transform [[2]](https://muthu.co/skew-detection-and-correction-of-document-images-using-hough-transform/)
2. Horizontal Projection [[1]](https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/)

The algorithm implemented here is a simple and fast projection-based method I improved upon existing ones. It is basically a modification of the method described in [[1]](https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/). I found that applying minimum/maximum filters (implemented using 1D max-pooling operations) then computing the difference is a very reasonable and effective way to extract "peak signals" from the horizontal projection profile. To the best of my knowledge, this is the first such attempt in image deskewing task.


[1] https://muthu.co/deskewing-scanned-documents-using-horizontal-projections/

[2] https://muthu.co/skew-detection-and-correction-of-document-images-using-hough-transform/


## Contact

hermercur@gmail.com

사용된 사진의 저작권과 관련하여 문제가 있는 경우, 위 이메일로 연락 주시기 바랍니다.
